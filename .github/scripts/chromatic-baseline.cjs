// Commits Chromatic may have built for a pull request, for the workflows to
// fetch before publishing: a squash merge or a force-push removes them from
// the clone, and Chromatic then falls back to a much older baseline.
//
// `built` holds the commits recorded in the workflow's own sticky comment.
// Markers in anyone else's comment are ignored, so a commenter can neither
// skip an approval build nor grow the fetch list. `previous` adds every
// commit a force-push replaced, from the PR timeline.
module.exports = async ({ github, context, core }, number) => {
  const { owner, repo } = context.repo;
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: number,
    per_page: 100,
  });
  const built = new Set();
  for (const c of comments) {
    if (c.user?.login !== 'github-actions[bot]') continue;
    for (const m of c.body?.matchAll(/chromatic-sha:([0-9a-f]{40})/g) ?? []) built.add(m[1]);
  }
  const previous = new Set(built);
  try {
    const { repository } = await github.graphql(
      `query($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $number) {
            timelineItems(itemTypes: [HEAD_REF_FORCE_PUSHED_EVENT], last: 100) {
              nodes { ... on HeadRefForcePushedEvent { beforeCommit { oid } afterCommit { oid } } }
            }
          }
        }
      }`,
      { owner, repo, number }
    );
    for (const e of repository.pullRequest.timelineItems.nodes) {
      for (const c of [e.beforeCommit, e.afterCommit]) if (c?.oid) previous.add(c.oid);
    }
  } catch (error) {
    core.warning(`Could not read the force-push history: ${error.message}`);
  }
  return { comments, built, previous };
};

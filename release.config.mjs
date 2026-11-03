// The Angular preset links every #123 in a commit subject to this repo's issues.
// Point owner/repo#123 references at the repo they name instead.
const linkCrossRepoIssues = (context) => ({
  ...context,
  commitGroups: context.commitGroups.map((group) => ({
    ...group,
    commits: group.commits.map((commit) => ({
      ...commit,
      subject: commit.subject?.replace(
        /([\w.-]+\/[\w.-]+)\[#(\d+)\]\([^)]*\)/g,
        (_, repo, issue) => `[${repo}#${issue}](${context.host}/${repo}/issues/${issue})`
      ),
    })),
  })),
});

export default {
  tagFormat: 'react-${version}',
  branches: ['main', { name: 'rc', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', { writerOpts: { finalizeContext: linkCrossRepoIssues } }],
    ['@semantic-release/changelog', { changelogFile: './CHANGELOG.md' }],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
      },
    ],
    ['@semantic-release/npm', { pkgRoot: 'dist' }],
    [
      '@semantic-release/github',
      {
        successCommentCondition: false,
        assets: [{ path: 'dist/*.tgz', label: 'Package' }],
      },
    ],
  ],
};

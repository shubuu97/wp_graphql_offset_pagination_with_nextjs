//? Gets called on load more, merges the old results with the new one
const updateQuery = (previousResult, { fetchMoreResult }) => {
  return {
    ...fetchMoreResult,
    posts: {
      ...(fetchMoreResult?.posts ?? {}),
      nodes: [
        ...(previousResult?.posts?.nodes ?? []),
        ...(fetchMoreResult?.posts?.nodes ?? []),
      ],
    },
  };
};

export default updateQuery;

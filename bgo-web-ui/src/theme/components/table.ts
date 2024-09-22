const Table = {
  parts: ['thead', 'th', 'td'],
  baseStyle: {
    thead: {
      bg: 'header.background',
      borderBottom: '1px solid',
      borderBottomColor: 'main.darkGrey',
    },
    th: {
      fontWeight: 'normal',
      letterSpacing: 0,
      fontSize: 'md',
      textTransform: 'none',
      color: 'main.lightBlack',
      borderBottomStyle: 'none',
      py: '1rem',
      pr: '6rem',
    },
    td: {
      fontWeight: 'normal',
      fontSize: 'md',
      color: 'main.lightBlack',
      borderBottomStyle: 'none',
      py: '1.25rem',
      pr: '6rem',
      whiteSpace: [null, null, null, null, 'nowrap'],
    },
  },
  sizes: {
    thin: {
      th: {
        px: '4',
        py: '1',
        lineHeight: '4',
        fontSize: 'md',
      },
      td: {
        px: '4',
        py: '2',
        fontSize: 'md',
        lineHeight: '4',
      },
      caption: {
        px: '4',
        py: '2',
        fontSize: 'md',
      },
    },
  },
}

export default Table

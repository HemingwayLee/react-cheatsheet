import { colors } from "@atlaskit/theme";
import finnImg from "./static/finn-min.png";
import bmoImg from "./static/bmo-min.png";
import princessImg from "./static/princess-min.png";
import jakeImg from "./static/jake-min.png";

const jake = {
  id: "1",
  name: "1st Column",
  avatarUrl: jakeImg,
  colors: {
    soft: colors.Y50,
    hard: colors.N400A
  }
};

const BMO = {
  id: "2",
  name: "2nd Column",
  avatarUrl: bmoImg,
  colors: {
    soft: colors.G50,
    hard: colors.N400A
  }
};

const finn = {
  id: "3",
  name: "3rd Column",
  avatarUrl: finnImg,
  colors: {
    soft: colors.B50,
    hard: colors.N400A
  }
};

const princess = {
  id: "4",
  name: "4th Column",
  avatarUrl: princessImg,
  colors: {
    soft: colors.P50,
    hard: colors.N400A
  }
};

const kanbans = [jake, BMO, finn, princess];
const tags = {
  proj1: {
    name: "Zero",
    colors: {
      soft: colors.Y50,
      hard: colors.N400A
    }
  },
  proj2: {
    name: "Oxygen",
    colors: {
      soft: colors.P50,
      hard: colors.N400A
    }
  },
  proj3: {
    name: "Django",
    colors: {
      soft: colors.R50,
      hard: colors.N400A
    }
  },
  proj4: {
    name: "Apollo",
    colors: {
      soft: colors.G50,
      hard: colors.N400A
    }
  },
  proj4: {
    name: "Flash",
    colors: {
      soft: colors.B50,
      hard: colors.N400A
    }
  }
}

const quotes = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    theDate: "2020/03/24",
    author: BMO,
    tag: tags.proj2
  },
  {
    id: "2",
    content: "Sucking at something is the first step towards being sorta good at something.",
    theDate: "2020/03/04",
    author: jake,
    tag: tags.proj1
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    theDate: "2020/09/14",
    author: jake,
    tag: tags.proj3
  },
  {
    id: "4",
    content: "Is that where creativity comes from? From sad biz?",
    theDate: "2020/03/04",
    author: finn,
    tag: tags.proj1
  },
  {
    id: "5",
    content: "Homies help homies. Always",
    theDate: "2020/03/04",
    author: finn,
    tag: tags.proj2
  },
  {
    id: "6",
    content: "Responsibility demands sacrifice",
    theDate: "2020/03/04",
    author: princess,
    tag: tags.proj4
  },
  {
    id: "7",
    content: "That's it! The answer was so simple, I was too smart to see it!",
    theDate: "2020/03/04",
    author: princess,
    tag: tags.proj1
  },
  {
    id: "8",
    content: "People make mistakes. It's all a part of growing up and you never really stop growing",
    theDate: "2020/03/04",
    author: finn,
    tag: tags.proj2
  },
  {
    id: "9",
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    theDate: "2020/03/04",
    author: finn,
    tag: tags.proj3
  },
  {
    id: "10",
    content: "I should not have drunk that much tea!",
    theDate: "2020/03/04",
    author: princess,
    tag: tags.proj4
  },
  {
    id: "11",
    content: "Please! I need the real you!",
    theDate: "2023/01/21",
    author: princess,
    tag: tags.proj1
  },
  {
    id: "12",
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    theDate: "2021/03/21",
    author: princess,
    tag: tags.proj2
  }
];

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

const getQuotes = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const custom = {
      ...random,
      id: `G${idCount++}`
    };

    return custom;
  });

// export const getkanbans = (count) =>
//   Array.from({ length: count }, (v, k) => k).map(() => {
//     const random = kanbans[Math.floor(Math.random() * kanbans.length)];
//     const custom = {
//       ...random,
//       id: `author-${idCount++}`
//     };
//     return custom;
//   });

// const getByAuthor = (author, items) =>
//   items.filter((quote) => quote.author === author);

// export const authorQuoteMap = kanbans.reduce(
//   (previous, author) => ({
//     ...previous,
//     [author.name]: getByAuthor(author, quotes)
//   }),
//   {}
// );

export const generateQuoteMap = (quoteCount) => kanbans.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getQuotes(quoteCount / kanbans.length)
  }),
  {}
);

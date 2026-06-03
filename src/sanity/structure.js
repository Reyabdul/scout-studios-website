// https://www.sanity.io/docs/structure-builder-cheat-sheet

/** One shared page or site-wide setting — each item opens a single editor. */
const singlePage = (S, typeName, title) =>
  S.listItem()
    .title(title)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title),
    )

export const structure = (S) =>
  S.list()
    .title('Your website')
    .items([
      singlePage(S, 'intro', 'Movie Intro Screen'),
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Sections')
            .items([
              singlePage(S, 'home', 'Home Section'),
              singlePage(S, 'mission', 'Mission Section'),
              S.documentTypeListItem('works').title('Works Section'),
              singlePage(S, 'contact', 'Contact Section'),
            ]),
        ),
      S.listItem()
        .title('Menus & footer')
        .child(
          S.list()
            .title('Menus & Footer')
            .items([
              singlePage(S, 'navbar', 'Main menu (top of site)'),
              singlePage(S, 'moreInfo', 'Info panel (slide-out)'),
              singlePage(S, 'footer', 'Footer'),
            ]),
        ),
    ])

// https://www.sanity.io/docs/structure-builder-cheat-sheet

const singleton = (S, typeName, title) =>
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
    .title('Content')
    .items([
      singleton(S, 'intro', 'Opening Video'),
      S.listItem()
        .title('Sections')
        .child(
          S.list()
            .title('Sections')
            .items([
              singleton(S, 'home', 'Home'),
              singleton(S, 'mission', 'Mission'),
              S.documentTypeListItem('works').title('Works'),
              singleton(S, 'contact', 'Contact'),
            ]),
        ),
      S.listItem()
        .title('Menus & Footer')
        .child(
          S.list()
            .title('Menus & Footer')
            .items([
              singleton(S, 'navbar', 'Top Menu'),
              singleton(S, 'moreInfo', 'Side Panel'),
              singleton(S, 'footer', 'Footer'),
            ]),
        ),
    ])

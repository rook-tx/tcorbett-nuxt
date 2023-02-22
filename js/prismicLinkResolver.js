export default function linkResolver(doc) {
  if ([ 'lab', 'project' ].includes(doc.type)) {
    return `/${doc.type}s/${doc.uid}`
  }
  return null
}

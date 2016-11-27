export default function slugTitle(title) {
    return title
        .replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"")
        .replace(/\s+/g, "-")
        .toLowerCase();
}

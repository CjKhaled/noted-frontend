export interface Note {
    id: string
    title: string
    content: string
    groupId: string
    createdAt: Date
}

export interface NoteGroup {
    id: string
    name: string
}
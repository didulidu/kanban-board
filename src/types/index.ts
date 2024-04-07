export interface Task {
    id: string;
    text: string;
    type: 'todo' | 'progress' | 'done';
}
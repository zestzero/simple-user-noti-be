export class CreateTaskDto {
    readonly title: string;
    readonly assignees: string | null;
    readonly completed: boolean;
}

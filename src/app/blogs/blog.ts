export interface Blog {
    message: string;
    data: {
        blogId: string,
        creator: string;
        title: string,
        description: string,
        bodyHtml: string,
        author: string,
        created: Date
    };
}

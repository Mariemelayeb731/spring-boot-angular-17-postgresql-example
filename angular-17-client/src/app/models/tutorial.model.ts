export class Tutorial {
    id?: number;
    title: string;
    description: string;
    published?: boolean;
  
    constructor(title: string, description: string, published?: boolean, id?: number) {
      this.title = title;
      this.description = description;
      this.published = published;
      this.id = id;
    }
  }
  
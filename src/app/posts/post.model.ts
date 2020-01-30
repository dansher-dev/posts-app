export interface Post {
  id: string;
  title: string;
  content: string;
}
export interface PostResponse {
  message: string;
  posts: ResponsePost[];
}

export interface ResponsePost {
  _id: string;
  title: string;
  content: string;
}

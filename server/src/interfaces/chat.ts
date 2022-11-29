export interface CreateMessageBody {
  dialogId: number;
  senderId: number;
  text: string;
  fileLink: string;
  replyTo: number | null;
}

export interface SocketGetMessages {
  dialogId: number;
  receiverId: number;
  senderId: number;
  text: string;
}
export interface SearchInDialogs {
  id: number;
  searchText: string;
}

export interface SearchInCurrentDialog {
  dialogId: number;
  searchText: string;
}

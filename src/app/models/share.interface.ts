export interface Share {

  nombre: string;
  url: string;
  date: number;
  icon?: {
    icon: string,
    color: string
  };
  type?: string;
  size?: number;
  uid?: string;
  ownerName?: string;
  sharedWithName?: string;
  sharedWithUid?: string;
}

export interface MailBoxProps {
  postboxId: number;
  longtitude: number;
  latitude: number;
  title: string;
}

export interface ArProps {
  mailBoxes: MailBoxProps[];
  lng: number;
  lat: number;
}

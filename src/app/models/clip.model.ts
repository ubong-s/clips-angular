import firebase from 'firebase/compat/app';

export default interface IClip {
  docID?: string;
  uid: string;
  displayname: string;
  title: string;
  fileName: string;
  url: any;
  timestamp: firebase.firestore.FieldValue;
}

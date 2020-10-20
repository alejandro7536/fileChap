export class UserModel {
  constructor(
    public name: string,
    public email: string,
    public photo?: string,
    public uid?: string
  ) {

  }
}

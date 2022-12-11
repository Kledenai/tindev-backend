import HttpException from './httpException';

class DevNotFoundException extends HttpException {
  constructor(username: any) {
    super(404, `User with username ${username} not found`);
  }
}

export default DevNotFoundException;

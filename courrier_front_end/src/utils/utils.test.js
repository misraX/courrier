import { head } from './utils';

describe('utils testing', () => {
  it('should return a proper head object.', () => {
    expect(head).toEqual({
      id: '#',
      courier: 'Courrier',
      driverName: 'Driver Name',
      status: 'Task status',
      description: 'Task Description',
      startedAt: 'Task start',
      finishedAt: 'Task finish',
      driverComment: 'Driver comment'
    });
  });
});

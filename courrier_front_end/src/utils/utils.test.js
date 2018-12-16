import { listHead, splitLocation } from './utils';

describe('utils testing', () => {
  it('should return a proper head object.', () => {
    expect(listHead).toEqual({
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
  it('should return langitued and latitue of the give location.', () => {
    expect(splitLocation("25.191099, 55.283402")).toEqual({
      lat: "25.191099",
      lng: "55.283402"
    })
  });
});

export const listHead = {
  id: '#',
  courier: 'Courrier',
  driverName: 'Driver Name',
  status: 'Task status',
  description: 'Task Description',
  startedAt: 'Task start',
  finishedAt: 'Task finish',
  driverComment: 'Driver comment'
};
export const detailHead = {
  id: '#',
  courier: 'Courrier',
  driverName: 'Driver Name',
  status: 'Task status',
  description: 'Task Description',
  startedAt: 'Task start',
  finishedAt: 'Task finish',
  driverComment: 'Driver comment',
  fromLocation: 'From Locations'
};

export const splitLocation = location => {
  let lngLat = String(location)
    .replace(' ', '')
    .split(',');
  return { lat: lngLat[0], lng: lngLat[1] };
};

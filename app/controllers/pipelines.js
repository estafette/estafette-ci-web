import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['page', 'size', 'status'],
    page: 1,
    size: 20,
    status: ''
});

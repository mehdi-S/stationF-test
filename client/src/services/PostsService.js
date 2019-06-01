import Api from '@/services/Api';

export default {
  fetchPosts() {
    return Api().get('post');
  },

  searchPosts(params) {
    return Api().get('search', { params });
  },

  addPost(params) {
    return Api().post('post', params);
  },

  updatePost(params) {
    return Api().put(`post/${params.id}`, params);
  },

  updateRoomResa(params) {
    return Api().put('post', params);
  },

  getPost(params) {
    return Api().get(`post/${params.id}`);
  },

  deletePost(id) {
    return Api().delete(`post/${id}`);
  },
};

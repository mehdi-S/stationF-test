import Api from '@/services/Api';

export default {
  fetchPosts() {
    return Api().get('post');
  },

  addPost(params) {
    return Api().post('post', params);
  },

  updatePost(params) {
    return Api().put(`post/${params.id}`, params);
  },

  getPost(params) {
    return Api().get(`post/${params.id}`);
  },

  deletePost(id) {
    return Api().delete(`post/${id}`);
  },
};

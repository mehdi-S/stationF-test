
<template>
  <div class="posts">
    <h1>List of Rooms</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Rooms</router-link>
      </div>
      <table>
        <tr>
          <td width="300" align="center">Titre</td>
          <td width="550" align="center">Description</td>
          <td width="100" align="center">Taille</td>
          <td width="500" align="center">Equipement(s)</td>
          <td width="200" align="center">Actions</td>
        </tr>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td>{{ post.capacity }}</td>
          <td>
            <p v-for="item in post.equipments" :key="item.id">{{ item.name}}</p>
          </td>
          <td align="center">
            <router-link v-bind:to="{ name: 'Edit', params: { id: post._id } }">
              Edit
            </router-link> |
            <a href="/list" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no room.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Room</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'List',
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
    },
    async deletePost(id) {
      await PostsService.deletePost(id);
      this.$router.push({ name: 'Posts' });
    },
  },
};
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>

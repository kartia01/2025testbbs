import { useState, useEffect } from 'react';
import supabase from './utils/supabase';
import dayjs from 'dayjs';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data: posts } = await supabase.from('posts').select();

      setPosts(posts);

      console.log(posts);
    }

    getPosts();
  }, []);

  return (
    <div>
      <h3>post</h3>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            {post.NAME} / {post.TITLE} / {post.CONTENT} / {dayjs(post.created_at).format('YYYY-MM-DD')}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;

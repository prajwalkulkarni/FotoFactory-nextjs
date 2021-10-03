import PostItem from './PostItem';
import classes from './PostList.module.css';

function PostList(props) {
  return (
    <ul className={classes.list}>
      {props.posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          caption={post.caption}
        />
      ))}
    </ul>
  );
}

export default PostList;

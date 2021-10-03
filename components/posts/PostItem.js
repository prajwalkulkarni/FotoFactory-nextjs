import Card from '../ui/Card';
import classes from './PostItem.module.css';
import { useRouter} from 'next/router'
function PostItem(props) {

  const router = useRouter()

  const detailHandler = () =>{
    router.push('/'+props.id)
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.caption}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={detailHandler}>Add Comment</button>
        </div>
      </Card>
    </li>
  );
}

export default PostItem;

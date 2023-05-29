import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostListing from './post/PostListing';
import PostCreate from './post/PostCreate';
import PostEdit from './post/PostEdit';
import Login from './Login';
import Signup from './Signup';
import PostDetail from './post/PostDetails';
import CommentEdit from './comment/CommentEdit';
import CommentCreate from './comment/CommentCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/SignUp' element={<Signup />}></Route>

          <Route path='/posts' element={<PostListing />}></Route>
          <Route path='/posts/create' element={<PostCreate />}></Route>
          <Route path='/posts/detail/:postId' element={<PostDetail />}></Route>
          <Route path='/posts/edit/:postId' element={<PostEdit />}></Route>          
      
          <Route path='/comments/create/:postId' element={<CommentCreate />}></Route>
          <Route path='/comments/edit/:commentId' element={<CommentEdit />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;

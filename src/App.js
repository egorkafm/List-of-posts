import React, { useState, useEffect } from 'react'
// import Counter from './Components/Counter'
// import ClassCounter from './Components/ClassCounter'
import "./style/App.css"
// import PostItem from './Components/PostItem'
import PostList from './Components/PostList'
// import MyButton from './Components/UI/button/MyButton'
// import MyInput from './Components/UI/input/MyInput'
import PostForm from './Components/PostForm'
// import MySelect from './Components/UI/select/MySelect'
import PostFilter from './Components/PostFilter'
import MyModal from './Components/UI/modal/MyModal'
import MyButton from './Components/UI/button/MyButton'
import { usePosts } from './hooks/usePost'
import axios from 'axios'

function App() {
	
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: '', quary: ''})
	const [modal, setModal] = useState(false)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.quary)

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	useEffect(() => {
		featchPosts()
	}, [])

	async function featchPosts() {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
		setPosts(response.data)
	}
	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

  return (
		<div className="App">
			<MyButton
				style={{marginTop: '30px'}}
				onClick={() => setModal(true)}>
				Create post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal} >
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: '15px 0'}}/>
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of posts'/>
		</div>
  )
}

export default App;

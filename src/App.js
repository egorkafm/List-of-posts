import React, { useState, useMemo } from 'react'
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

function App() {
	
	const [posts, setPosts] = useState([
		{id: 1, title: 'аа', body:'бб'},
		{id: 2, title: 'гг 2', body:'аа'},
		{id: 3, title: 'вв 3', body:'яя'},
	])
	
	const [filter, setFilter] = useState({sort: '', quary: ''})
	const [modal, setModal] = useState(false)

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
		}
		return posts;
	}, [filter.sort, posts])

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.quary.toLowerCase()))
	}, [filter.quary, sortedPosts])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
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

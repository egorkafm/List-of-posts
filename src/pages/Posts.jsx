import React, { useState, useEffect } from 'react'
import PostList from '../Components/PostList'
import PostForm from '../Components/PostForm'
import PostFilter from '../Components/PostFilter'
import MyModal from '../Components/UI/modal/MyModal'
import MyButton from '../Components/UI/button/MyButton'
import { usePosts } from '../hooks/usePost'
import PostService from '../API/PostService'
import Loader from '../Components/UI/loader/Loader'
import { useFetching } from '../hooks/useFetching'
import { getPageCount } from '../utils/pages'
import Pagination from '../Components/UI/pagination/Pagination'

function Posts() {

	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: '', quary: ''})
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.quary)

	const [featchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page)
		setPosts(response.data)
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit))
	})

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	useEffect(() => {
		featchPosts(limit, page)
	}, [])
	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page)
		featchPosts(limit, page)
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
			{postError &&
				<h2>An error has occurred ${postError}</h2>
			}
			{isPostsLoading
				?	<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
				:	<PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of posts'/>
			}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
  )
}

export default Posts;

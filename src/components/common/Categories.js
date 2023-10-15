import {Outlet, Link } from 'react-router-dom';
import '../../styles/Category.scss';
import { useSelector } from 'react-redux';


const Categories = ({onSelect,category}) => {
    const loginId = useSelector(state=>state.user.loginId);
    const categories = [
        {
            name: '/community',
            text: '커뮤니티'
        },
        {
            name: `/schedule/${loginId}`,
            text: '스케줄'
        },
    ];
    return (
        <div style={{margin:'0 auto'}}>
            <header className='Block'>
                {categories.map(c=>(
                    <Link to={c.name} style={{textDecoration:'none'}} key={c.name}>
                        <div
                        key={c.name}
                        className={c.name === category ? "Child Selected" : "Child"}
                        onClick={()=>onSelect(c.name)}
                        >
                            {c.text}
                        </div>
                    </Link>
                ))}
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Categories;
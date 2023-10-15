import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
const localizer = momentLocalizer(moment);

const messages = {
  allDay: '하루 종일',
  previous: '이전',
  next: '다음',
  today: '오늘',
  month: '월', // 'month' 텍스트를 '월'로 변경
  week: '주',
  day: '일',
  agenda: '일정',
  date: '날짜',
  time: '시간',
};

function BigCalender({postList,openModal}) {
    function eventStyleGetter(event, start, end, isSelected) {
        return {
          style: {
            backgroundColor: isSelected ? '#b4b5b6' : event.color,
          },
          onClick: () => handleEventClick(event), // 클릭 이벤트 핸들러를 추가합니다.
        };
      }
    function handleEventClick(event) {
    // 이벤트 클릭 시 실행할 작업을 이곳에 작성합니다.
    console.log(`클릭된 이벤트: ${event.title}, ${event.start}, ${event.end}`);
    
    // 원하는 작업을 수행하세요.
    }
    
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        <Calendar
            localizer={localizer}
            events={postList}
            startAccessor="startDate"
            endAccessor="endDate"
            eventPropGetter={eventStyleGetter}
            views={{
              month: true, // 월별 뷰
              week: true,  // 주별 뷰
              day: true    // 일별 뷰
              // 여러 다른 뷰 추가 가능
            }}
            messages={messages} // messages prop을 사용하여 한글 텍스트 설정
            onSelectEvent={event => openModal(event)} // 클릭 이벤트 핸들러 연결
            style={{ width:'65%',height: 800 }}
            
            />

        </div>
    );
}

export default BigCalender;
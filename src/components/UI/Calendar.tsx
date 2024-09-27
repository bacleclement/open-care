"use client";

import React from 'react'
import {DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput,} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {fakeEventService} from '@/data/event';
import {addDays} from 'date-fns';
import EventFormDialog from '@/components/UI/EventFormDialog';

interface CalendarState {
  weekendsVisible: boolean,
  currentEvents: EventApi[],
}

export default class DemoApp extends React.Component<object, CalendarState> {

  state: CalendarState = {
    weekendsVisible: true,
    currentEvents: [],
  }

  render() {
    return (
      <div className='demo-app'>
        {/*{this.renderSidebar()}*/}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={fakeEventService(new Date(), addDays(new Date(), 15), 50, 5)}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  // renderSidebar() {
  //   return (
  //     <div className='demo-app-sidebar'>
  //       <div className='demo-app-sidebar-section'>
  //         <label>
  //           <input
  //             type='checkbox'
  //             checked={this.state.weekendsVisible}
  //             onChange={this.handleWeekendsToggle}
  //           ></input>
  //           toggle weekends
  //         </label>
  //       </div>
  //       <div className='demo-app-sidebar-section'>
  //         <h2>All Events ({this.state.currentEvents.length})</h2>
  //         <ul>
  //           {this.state.currentEvents.map(renderSidebarEvent)}
  //         </ul>
  //       </div>
  //     </div>
  //   )
  // }
  //
  // handleWeekendsToggle = () => {
  //   this.setState({
  //     weekendsVisible: !this.state.weekendsVisible
  //   })
  // }

  handleDateSelect = (data: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = data.view.calendar;

    EventFormDialog(data.start)

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: data.startStr,
        end: data.endStr,
        allDay: data.allDay
      })
    }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

// function renderSidebarEvent(event: EventApi) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

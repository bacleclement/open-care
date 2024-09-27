import {addDays, addMinutes} from 'date-fns';
import {faker} from '@faker-js/faker/locale/fr';
import {v4 as uuidv4} from 'uuid';

export class Event {
  public id!: string;
  public createdAt!: Date;
  public title!: string;
  public description!: string;
  // public location?: string;
  public start!: Date;
  public duration!: number;
  public end!: Date;
  public attendees?: Attendee[];
}

export class Attendee {
  public fullname?: string;
  public email!: string;
  public organizer?: boolean;
  public responseStatus?: ResponseStatus;
}

export enum ResponseStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  UNKNOWN = "UNKNOWN",
}

export const fakeEventService = (start: Date, end: Date, totalEvents: number, eventsPerDay: number): Event[] => {
  const events: Event[] = [];
  let currentDate: Date = start;
  let dayEventCount = 0;
  for (let i = 0; i < totalEvents && currentDate < end; i++) {
    events.push(generateEvent(currentDate, dayEventCount++));
    if (dayEventCount >= eventsPerDay) {
      currentDate = addDays(currentDate, 1);
      dayEventCount = 0;
    }
  }
  return events;
}

const generateEvent = (date: Date, eventCount: number): Event => {
  const event: Event = new Event();
  event.id = uuidv4();
  event.start = addMinutes(date, eventCount * 60);
  event.createdAt = new Date();
  event.title = faker.company.catchPhrase();
  event.description = faker.lorem.paragraph();
  event.duration = 60;
  event.end = addMinutes(event.start, event.duration);
  event.attendees = generateFakeAttendees(Math.floor(Math.random() * 5));
  return event;
}

const statuses = Object.values(ResponseStatus);

const generateFakeAttendees = (numAttendees: number): Attendee[] => {
  const attendees: Attendee[] = [];
  for (let i = 0; i < numAttendees; i++) {
    attendees.push({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      organizer: i === 0,
      responseStatus: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return attendees;
}

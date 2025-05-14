
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Types for content sections
export interface ContentSections {
  hero: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  about: {
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  mission: {
    title: string;
    description: string;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface AcademicProgram {
  id: number;
  name: string;
  description: string;
  grades: string;
  features: string[];
}

export interface Course {
  id: number;
  name: string;
  department: string;
  grade: string;
  description: string;
}

// In a real app, this would be backed by a database
// For demonstration, we'll use localStorage to persist data between sessions
const useAdminSync = () => {
  const [initialized, setInitialized] = useState(false);

  // Initialize default content if not already in localStorage
  useEffect(() => {
    if (!initialized) {
      // Default content sections
      const defaultSections: ContentSections = {
        hero: {
          title: "Empowering Future Leaders",
          description: "We provide a nurturing, inclusive, and academically rigorous environment where students grow into confident, compassionate leaders.",
          buttonText: "Apply Now",
          buttonLink: "/admissions#apply"
        },
        about: {
          title: "Discover Our School",
          description: "At Academy, we believe in nurturing the whole child—academically, socially, emotionally, and physically. Our challenging curriculum is designed to inspire curiosity, creativity, and critical thinking.",
          stats: [
            { value: '95%', label: 'College Acceptance' },
            { value: '12:1', label: 'Student-Teacher Ratio' },
            { value: '40+', label: 'Extracurricular Activities' },
            { value: '30+', label: 'Years of Excellence' }
          ]
        },
        mission: {
          title: "Our Mission & Vision",
          description: "Our mission is to provide a nurturing, inclusive, and academically rigorous environment where students grow into confident, compassionate leaders."
        }
      };

      // Default news items
      const defaultNews: NewsItem[] = [
        {
          id: 1,
          title: "Academy Students Win Regional Science Competition",
          date: "May 2, 2025",
          excerpt: "Our high school science team took first place in the regional science olympiad, advancing to the state finals.",
          content: "Our high school science team took first place in the regional science olympiad, advancing to the state finals. The team, led by Dr. Smith, competed against 15 other schools and excelled in all categories including physics, chemistry, and biology experiments.",
          image: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: 2,
          title: "Annual Arts Festival Showcases Student Creativity",
          date: "April 15, 2025",
          excerpt: "The Spring Arts Festival featured impressive student work across visual arts, music, theater, and dance.",
          content: "The Spring Arts Festival featured impressive student work across visual arts, music, theater, and dance. Over 200 students participated, displaying their creative talents to the school community and beyond.",
          image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
      ];

      // Default events
      const defaultEvents: EventItem[] = [
        {
          id: 1,
          title: "Spring Arts Showcase",
          date: "May 15",
          time: "6:00 PM",
          location: "Main Auditorium",
          description: "Join us for an evening celebrating student creativity across visual arts, music, drama, and dance."
        },
        {
          id: 2,
          title: "Varsity Basketball Finals",
          date: "May 20",
          time: "4:30 PM",
          location: "School Gymnasium",
          description: "Cheer on our team as they compete for the regional championship."
        },
        {
          id: 3,
          title: "Parent-Teacher Conferences",
          date: "May 25",
          time: "10:00 AM",
          location: "All Classrooms",
          description: "Scheduled meetings between parents and teachers to discuss student progress."
        },
      ];

      // Default academic programs
      const defaultAcademicPrograms: AcademicProgram[] = [
        {
          id: 1,
          name: "Elementary School Program",
          description: "Our comprehensive elementary program focuses on foundational skills in literacy, mathematics, science, and social studies while encouraging creativity and critical thinking.",
          grades: "K-5",
          features: ["Small class sizes", "Specialized teachers", "Integrated arts program", "Regular field trips"]
        },
        {
          id: 2,
          name: "Middle School Program",
          description: "The middle school program builds on elementary foundations with deeper subject exploration, strengthening academic skills while supporting the unique developmental needs of adolescents.",
          grades: "6-8",
          features: ["Departmentalized instruction", "Leadership opportunities", "Advisory program", "Expanded electives"]
        },
        {
          id: 3,
          name: "High School College Preparatory",
          description: "Our college preparatory program challenges students with rigorous academics, AP courses, and comprehensive guidance to prepare graduates for success at top universities.",
          grades: "9-12",
          features: ["Advanced Placement courses", "College counseling", "Dual enrollment options", "Capstone projects"]
        }
      ];

      // Default courses
      const defaultCourses: Course[] = [
        {
          id: 1,
          name: "Advanced Mathematics",
          department: "Mathematics",
          grade: "High School",
          description: "Advanced course covering calculus, statistics, and discrete mathematics."
        },
        {
          id: 2,
          name: "World Literature",
          department: "English",
          grade: "High School",
          description: "Exploration of global literary traditions and major works."
        },
        {
          id: 3,
          name: "Environmental Science",
          department: "Science",
          grade: "Middle School",
          description: "Study of ecosystems, conservation, and environmental challenges."
        }
      ];

      // Initialize localStorage if not already set
      if (!localStorage.getItem('content-sections')) {
        localStorage.setItem('content-sections', JSON.stringify(defaultSections));
      }

      if (!localStorage.getItem('news-items')) {
        localStorage.setItem('news-items', JSON.stringify(defaultNews));
      }

      if (!localStorage.getItem('events')) {
        localStorage.setItem('events', JSON.stringify(defaultEvents));
      }

      if (!localStorage.getItem('academic-programs')) {
        localStorage.setItem('academic-programs', JSON.stringify(defaultAcademicPrograms));
      }

      if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify(defaultCourses));
      }

      setInitialized(true);
    }
  }, [initialized]);

  // Content sections functions
  const getContentSections = (): ContentSections => {
    const storedSections = localStorage.getItem('content-sections');
    if (storedSections) {
      return JSON.parse(storedSections) as ContentSections;
    }
    return {} as ContentSections;
  };

  const updateContentSections = (sections: ContentSections) => {
    localStorage.setItem('content-sections', JSON.stringify(sections));
    toast({
      title: "Content Updated",
      description: "Website content has been successfully updated",
    });
  };

  // News functions
  const getNewsItems = (): NewsItem[] => {
    const storedNews = localStorage.getItem('news-items');
    if (storedNews) {
      return JSON.parse(storedNews) as NewsItem[];
    }
    return [];
  };

  const updateNewsItems = (news: NewsItem[]) => {
    localStorage.setItem('news-items', JSON.stringify(news));
    toast({
      title: "News Updated",
      description: "News items have been successfully updated",
    });
  };

  // Events functions
  const getEvents = (): EventItem[] => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      return JSON.parse(storedEvents) as EventItem[];
    }
    return [];
  };

  const updateEvents = (events: EventItem[]) => {
    localStorage.setItem('events', JSON.stringify(events));
    toast({
      title: "Events Updated",
      description: "Event items have been successfully updated",
    });
  };

  // Academic programs functions
  const getAcademicPrograms = (): AcademicProgram[] => {
    const storedPrograms = localStorage.getItem('academic-programs');
    if (storedPrograms) {
      return JSON.parse(storedPrograms) as AcademicProgram[];
    }
    return [];
  };

  const updateAcademicPrograms = (programs: AcademicProgram[]) => {
    localStorage.setItem('academic-programs', JSON.stringify(programs));
    toast({
      title: "Academic Programs Updated",
      description: "Academic programs have been successfully updated",
    });
  };

  // Courses functions
  const getCourses = (): Course[] => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      return JSON.parse(storedCourses) as Course[];
    }
    return [];
  };

  const updateCourses = (courses: Course[]) => {
    localStorage.setItem('courses', JSON.stringify(courses));
    toast({
      title: "Courses Updated",
      description: "Courses have been successfully updated",
    });
  };

  return {
    initialized,
    getContentSections,
    updateContentSections,
    getNewsItems,
    updateNewsItems,
    getEvents,
    updateEvents,
    getAcademicPrograms,
    updateAcademicPrograms,
    getCourses,
    updateCourses
  };
};

export default useAdminSync;

import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    category: "Development",
    level: "Beginner",
    duration: 12,
  },
  {
    id: 2,
    title: "UI Design Basics",
    category: "Design",
    level: "Beginner",
    duration: 8,
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    category: "Development",
    level: "Advanced",
    duration: 16,
  },
  {
    id: 4,
    title: "Figma Essentials",
    category: "Design",
    level: "Intermediate",
    duration: 10,
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = initialCourses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      (selectedLevel === "All" || course.level === selectedLevel),
  );
  return (
    <div className="app">
      <div className="header">
        <h1>Explore Courses</h1>
        <p>Find something new to learn.</p>
      </div>

      <p className="course-count">{filteredCourses.length} courses found</p>

      <div className="filters">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onFilterCategory={setSelectedCategory}
        />
        <LevelFilter
          selectedLevel={selectedLevel}
          onFilterLevel={setSelectedLevel}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Try selecting a different category or level.</p>
        </div>
      ) : (
        <CourseCatalog courses={filteredCourses} />
      )}
    </div>
  );
}

function CourseCatalog({ courses }) {
  return (
    <div className="course-catalog">
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
}

function Course({ course }) {
  return (
    <Card>
      <Badge category={course.category} />
      <p className="course-title">{course.title}</p>
      <div className="course-details">
        <p>📖 {course.level}</p>
        <p>·</p>
        <p>{course.duration} hours</p>
      </div>
    </Card>
  );
}

function Card({ children }) {
  return <div className="course-card">{children}</div>;
}

function Badge({ category }) {
  return <p className={`badge badge-${category.toLowerCase()}`}>{category}</p>;
}

function CategoryFilter({ selectedCategory, onFilterCategory }) {
  return (
    <div>
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => onFilterCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Development">Development</option>
        <option value="Design">Design</option>
      </select>
    </div>
  );
}

function LevelFilter({ selectedLevel, onFilterLevel }) {
  return (
    <div>
      <select
        className="filter-select"
        value={selectedLevel}
        onChange={(e) => onFilterLevel(e.target.value)}
      >
        <option value="All">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Advanced">Advanced</option>
        <option value="Intermediate">Intermediate</option>
      </select>
    </div>
  );
}

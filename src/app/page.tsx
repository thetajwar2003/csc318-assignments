import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="#">
            {" "}
            Assignments for CSC318
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          This website hosts all my homework for the CSC31800 Internet
          Programming class.
        </p>

        <div className="mt-6 text-xl">
          <p>Each assignment will be available on its own dedicated page.</p>
          <p>Navigate through the menu to access each assignment.</p>
        </div>
        <div className="mt-6 text-xl">
          <p>Each assignment is available on its own dedicated page:</p>
          <ul className="list-disc list-inside mt-4">
            <li className="mt-2">
              <Link href="/gpa-calc" className="text-blue-600 underline">
                GPA Calculator
              </Link>
            </li>
            <li className="mt-2">
              <Link href="/task-manager" className="text-blue-600 underline">
                Task Manager
              </Link>
            </li>
            {/* Add more assignments here */}
          </ul>
        </div>
      </main>
    </div>
  );
}

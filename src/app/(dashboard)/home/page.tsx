import { delay } from "@/lib/async";
import Greeting from "@/components/Greeting";
import GreetingShimmer from "@/components/GreetingShimmer";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import NewProject from "@/components/NewProject";

const getProjectData = async () => {
  // await delay(2000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Home() {
  const { projects } = await getProjectData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingShimmer />}>
            {/* @ts-expect-error Async Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map((p) => (
            <div key={p.id} className="w-1/3 p-3">
              <Link href={`/project/${p.id}`}>
                <ProjectCard project={p} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Async Server Component */}
            <TaskCard title="Tasks" />
          </div>
        </div>
      </div>
    </div>
  );
}

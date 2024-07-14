"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const fetchCommits = async (repoUrl: string) => {
  const apiUrl = repoUrl.replace(
    "https://github.com/",
    "https://api.github.com/repos/"
  );
  const response = await axios.get(`${apiUrl}/commits`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Replace with your GitHub token
    },
  });
  return response.data;
};

const groupCommitsByDate = (commits: any[]) => {
  return commits.reduce((groups, commit) => {
    const date = new Date(commit.commit.author.date)
      .toISOString()
      .split("T")[0]; // Store the date in YYYY-MM-DD format
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(commit);
    return groups;
  }, {} as Record<string, any[]>);
};

export const TimelineLayout = ({ githubLink }: any) => {
  const [commits, setCommits] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitData = await fetchCommits(githubLink);
        const groupedCommits = groupCommitsByDate(commitData);
        setCommits(groupedCommits);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };

    fetchData();
  }, [githubLink]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {Object.keys(commits).map((date) => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Accordion.Root type="multiple" className="space-y-4">
            {commits[date].map((commit, index) => (
              <Accordion.Item
                key={commit.sha}
                value={`item-${date}-${index}`}
                className="border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <Accordion.Header className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md">
                  <Accordion.Trigger className="flex items-center space-x-2 text-left w-full">
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">{commit.commit.message}</span>
                  </Accordion.Trigger>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(
                          commit.commit.author.date
                        ).toLocaleTimeString()}
                      </Tooltip.Trigger>
                      <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 rounded-md">
                        {commit.commit.author.name}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Accordion.Header>
                <Accordion.Content className="bg-white dark:bg-gray-900 px-4 py-2 border border-t-0 rounded-b-md">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Author: {commit.commit.author.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Committer: {commit.commit.committer.name}
                  </p>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    View on GitHub
                  </a>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
};

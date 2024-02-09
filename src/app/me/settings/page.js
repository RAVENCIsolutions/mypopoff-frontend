"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [makePublic, setMakePublic] = useState(false);

  return (
    <main className="relative w-full h-full rounded-none lg:rounded-lg">
      <div className="flex flex-col md:flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="px-3 py-5 sm:p-6 w-full min-h-full sm:overflow-y-auto">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Account Settings
          </h2>
          <section
            className={`p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold`}>Privacy</h4>
            <article className={`mt-4 flex justify-between indent-4`}>
              <p className={`text-sm`}>Make my landing page public</p>
            </article>

            <article className={`mt-4 flex justify-between indent-4`}>
              <p className={`text-sm`}>Hide my pop off from internal search</p>
            </article>

            <article className={`mt-4 flex justify-between indent-4`}>
              <p className={`text-sm`}>
                Hide my landing page from search engines
              </p>
            </article>
          </section>

          <section
            className={`mt-6 p-4 bg-dashboard-primary-light/70 dark:bg-dashboard-secondary-light/20 rounded-xl shadow-lg shadow-dashboard-primary-dark/10`}
          >
            <h4 className={`text-base font-bold`}>Security</h4>
            <article className={`mt-4 flex justify-between indent-4`}>
              <p className={`text-sm`}>Change Password</p>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

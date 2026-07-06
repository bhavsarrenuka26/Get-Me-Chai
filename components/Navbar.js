"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from "next/link";
import { searchUsers } from '@/actions/useractions';

const Navbar = () => {
  const { data: session } = useSession()

  // Account dropdown 
  const [showdropdown, setShowdropdown] = useState(false)
  const accountRef = useRef(null)

  // Mobile hamburger menu
  const [showmobilemenu, setShowmobilemenu] = useState(false)

  // Search
  const [searchtext, setSearchtext] = useState("");
  const [results, setResults] = useState([]);
  const [showsearchdropdown, setShowsearchdropdown] = useState(false);
  const desktopSearchRef = useRef(null)
  const mobileSearchRef = useRef(null)

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchtext(value);

    if (value.length > 1) {
      let res = await searchUsers(value);
      setResults(res);
      setShowsearchdropdown(true);
    } else {
      setShowsearchdropdown(false);
      setResults([]);
    }
  }

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      const insideDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(e.target)
      const insideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target)
      if (!insideDesktop && !insideMobile) {
        setShowsearchdropdown(false)
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowdropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const SearchResults = () => (
    <div className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-4 text-sm text-gray-400 text-center">
          No creators found.
        </div>
      ) : (
        results.map((user) => (
          <Link
            href={`/${user.username}`}
            key={user._id}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0"
          >
            <img
              src={user.profilepic || "/defaultprofile.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-600 flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white leading-tight truncate">
                {user.name || "Unknown"}
              </span>
              <span className="text-xs text-gray-400 truncate">
                @{user.username}
              </span>
            </div>
          </Link>
        ))
      )}
    </div>
  )

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-40 border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">

        {/* Logo */}
        <Link className="flex items-center gap-2 font-bold text-xl shrink-0" href={"/"}>
          <img className="invertImg w-11 h-11" src="/tea.gif" alt="logo" />
          <span>GetMeaChai!</span>
        </Link>

        {/* search bar */}
        <div ref={desktopSearchRef} className="relative mx-4 hidden md:block w-full max-w-sm">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchtext}
            onChange={handleSearch}
            onFocus={() => { if (searchtext.length > 1) setShowsearchdropdown(true) }}
            className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all"
          />
          {showsearchdropdown && <SearchResults />}
        </div>

       
        <div className="hidden md:flex items-center gap-3 relative">
          {session && (
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                className="text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 focus:ring-2 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center gap-2 transition-colors"
                type="button"
              >
                Account
                <svg
                  className={`w-2.5 h-2.5 transition-transform ${showdropdown ? "rotate-180" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div className={`${showdropdown ? "" : "hidden"} absolute right-0 top-12 bg-gray-800 border border-gray-700 divide-y divide-gray-700 rounded-lg shadow-2xl w-44 overflow-hidden`}>
                <ul className="py-1 text-sm text-gray-200">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2.5 hover:bg-gray-700 transition-colors">Dashboard</Link>
                  </li>
                  <li>
                    <Link href={`/${session?.user?.name || ""}`} className="block px-4 py-2.5 hover:bg-gray-700 transition-colors">Your Page</Link>
                  </li>
                  <li>
                    <button onClick={() => signOut()} className="block w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors">Sign out</button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {session ? (
            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
              onClick={() => signOut()}
            >
              Logout
            </button>
          ) : (
            <Link href={"/login"}>
              <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setShowmobilemenu(!showmobilemenu)}
          aria-label="Toggle menu"
        >
          {showmobilemenu ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {showmobilemenu && (
        <div className="md:hidden border-t border-gray-800 px-4 py-4 space-y-4 bg-gray-900">

          {/* Mobile search */}
          <div ref={mobileSearchRef} className="relative">
            <input
              type="text"
              placeholder="Search creators..."
              value={searchtext}
              onChange={handleSearch}
              onFocus={() => { if (searchtext.length > 1) setShowsearchdropdown(true) }}
              className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all"
            />
            {showsearchdropdown && <SearchResults />}
          </div>

          {session && (
            <div className="flex flex-col gap-1 border-t border-gray-800 pt-3">
              <Link href="/dashboard" onClick={() => setShowmobilemenu(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm">Dashboard</Link>
              <Link href={`/${session?.user?.name || ""}`} onClick={() => setShowmobilemenu(false)} className="px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm">Your Page</Link>
            </div>
          )}

          <div className="pt-1">
            {session ? (
              <button
                className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                onClick={() => { signOut(); setShowmobilemenu(false); }}
              >
                Logout
              </button>
            ) : (
              <Link href={"/login"} onClick={() => setShowmobilemenu(false)}>
                <button className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
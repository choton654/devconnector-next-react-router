import Axios from "axios";
import cookie from "cookie";
import Link from "next/link";
import React from "react";
import ProfileAbout from "../components/ProfileAbout";
import ProfileCreds from "../components/ProfileCreds";
import ProfileGithub from "../components/ProfileGithub";
import ProfileHeader from "../components/ProfileHeader";
import baseUrl from "../utils/baseurl";

function profile({ profile }) {
  // console.log(profile);

  let profileContent;

  if (profile === null) {
    profileContent = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link href="/profiles">
              <a className="btn btn-light mb-3 float-left">Back To Profiles</a>
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
}

profile.getInitialProps = async (ctx) => {
  try {
    const {
      query: { handle },
    } = ctx;
    const { token } = cookie.parse(
      ctx.req ? ctx.req.headers.cookie || "" : document.cookie
    );
    const { data } = await Axios.get(
      `${baseUrl}/api/profile/handle/${handle}`,
      {
        headers: { Authorization: token },
      }
    );
    return { profile: data };
  } catch (error) {
    console.error(error);
    return { profile: {} };
  }
};

export default profile;

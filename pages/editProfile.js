import Axios from "axios";
import cookie from "cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroup";
import SelectListGroup from "../components/SelectListGroup";
import TextAreaFieldGroup from "../components/TextAreaFieldGroup";
import TextFieldGroup from "../components/TextFieldGroup";
import { AuthState } from "../context/states/authContext";
import baseUrl from "../utils/baseurl";

function EditProfile({ profile }) {
  const initialState = {
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    bio: "",
    displaySocialInputs: false,
    errors: {},
  };

  const [state, setstate] = useState(initialState);

  const {
    state: { errors },
    createProfile,
  } = AuthState();

  useEffect(() => {
    if (errors) {
      setstate({
        ...state,
        errors: errors,
      });
    }
    if (profile) {
      const skillCsv = profile.skills?.join(",");
      setstate({
        ...state,
        handle: profile.handle || "",
        company: profile.company || "",
        website: profile.website || "",
        location: profile.location || "",
        status: profile.status || "",
        bio: profile.bio || "",
        githubusername: profile.githubusername || "",
        skills: skillCsv,
        youtube: profile.social?.youtube || "",
        facebook: profile.social?.facebook || "",
        twitter: profile.social?.twitter || "",
        linkedin: profile.social?.linkedin || "",
        instagram: profile.social?.instagram || "",
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const {
      handle,
      company,
      website,
      location,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
      bio,
    } = state;

    const profileData = {
      handle,
      company,
      website,
      location,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
      bio,
    };

    createProfile(profileData);
    setstate({
      ...state,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      githubusername: "",
      skills: "",
      youtube: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      bio: "",
    });
  };

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Select options for status
  const options = [
    {
      label: "* Select Professional Status",
      value: 0,
    },
    { label: "Developer", value: "Developer" },
    {
      label: "Junior Developer",
      value: "Junior Developer",
    },
    {
      label: "Senior Developer",
      value: "Senior Developer",
    },
    { label: "Manager", value: "Manager" },
    {
      label: "Student or Learning",
      value: "Student or Learning",
    },
    {
      label: "Instructor or Teacher",
      value: "Instructor or Teacher",
    },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  let socialInputs;

  if (state.displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={state.twitter}
          onChange={onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={state.facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={state.linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={state.youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={state.instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link href="/users">
              <a className="btn btn-light">Go Back</a>
            </Link>
            <h1 className="display-4 text-center">Edit your Profile</h1>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={state.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={state.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={state.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={state.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={state.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={state.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setstate((prevState) => ({
                      ...state,
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditProfile.getInitialProps = async (ctx) => {
  try {
    const { token } = cookie.parse(
      ctx.req ? ctx.req.headers.cookie || "" : document.cookie
    );
    const { data } = await Axios.get(`${baseUrl}/api/profile`, {
      headers: { Authorization: token },
    });
    return { profile: data };
  } catch (error) {
    console.error(error);
    return { profile: {} };
  }
};

export default EditProfile;

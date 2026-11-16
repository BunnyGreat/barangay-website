import { useCallback, useState } from "react";
import {
  bgClassNames,
  textClassNames,
  DARK_COLORS,
} from "../../utils/constants";
import useDarkMode from "../../hooks/useDarkMode";
import azarconImage from "../../assets/images/officials/Hon.Azarcon.png";
import chingImage from "../../assets/images/officials/Hon.Ching.png";
import gallanosaImage from "../../assets/images/officials/Hon.Gallanosa.png";
import gonzagaImage from "../../assets/images/officials/Hon.Gonzaga.png";
import gumarangImage from "../../assets/images/officials/Hon.Gumarang.png";
import labezImage from "../../assets/images/officials/Hon.Labez.png";
import masiglaImage from "../../assets/images/officials/Hon.Masigla.png";
import mauhayImage from "../../assets/images/officials/Hon.Mauhay.png";
import mitraImage from "../../assets/images/officials/Hon.Mitra.png";
import apaoImage from "../../assets/images/officials/Apao.png";
import charlieBoyLabezImage from "../../assets/images/officials/Sir.Labez.png";
import OfficialCard from "../OfficialsCard/OfficialsCard";
import OfficialDetailsModal, {
  type OfficialDetails,
} from "../OfficialDetailsModal/OfficialDetailsModal";

const punongBarangay: OfficialDetails = {
  position: "Punong Barangay",
  name: "Hon. Jose Eric D. Ching",
  image: chingImage,
  objectPosition: "center 20%",
};

const officials: OfficialDetails[] = [
  {
    position: "Barangay Kagawad",
    name: "Charlie Boy C. Labez",
    image: charlieBoyLabezImage,
    objectPosition: "center 20%",
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Ma. Clarissa C. Labez",
    image: labezImage,
    objectPosition: "center 20%",
    committeeHeading: "Committee chairmanships",
    committees: [
      "Livelihood",
      "Tourism",
      "Rules, Ethics, Ordinance and Legal Matters",
    ],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Jhunjhun P. Mitra",
    image: mitraImage,
    objectPosition: "center 22%",
    committeeHeading: "Committee chairmanships",
    committees: ["Agriculture", "Transport"],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Reynold C. Gonzaga",
    image: gonzagaImage,
    objectPosition: "center 20%",
    committeeHeading: "Committee assignment",
    committees: ["Health"],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Mark Randolf S. Gallanosa",
    image: gallanosaImage,
    objectPosition: "center 18%",
    committeeHeading: "Committee chairmanship",
    committees: ["Public Works"],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Noel S. Masigla",
    image: masiglaImage,
    objectPosition: "center 18%",
    committeeHeading: "Committee assignments",
    committees: ["Peace and Order", "Human Rights"],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Elisa S. Gumarang",
    image: gumarangImage,
    objectPosition: "center 22%",
    committeeHeading: "Committee chairmanships",
    committees: [
      "Gender and Development",
      "Education",
      "Senior Citizen",
      "Appropriation",
    ],
  },
  {
    position: "SK Chairwoman",
    name: "Hon. Joanne A. Apao",
    image: apaoImage,
    objectPosition: "center 22%",
    committeeHeading: "Committee chairmanship",
    committees: ["Sports"],
  },
  {
    position: "Barangay Kagawad",
    name: "Hon. Joel G. Mauhay",
    image: mauhayImage,
    objectPosition: "center 26%",
    committeeHeading: "Committee chairmanship",
    committees: ["Environment"],
  },
  {
    position: "I.P. Representative",
    name: "Hon. Ma. Louisa G. Azarcon",
    image: azarconImage,
    objectPosition: "center 22%",
    committeeHeading: "Committee chairmanship",
    committees: ["Indigenous People"],
  },
];

export default function OfficialsSection() {
  const isDark = useDarkMode();
  const [selectedOfficial, setSelectedOfficial] =
    useState<OfficialDetails | null>(null);
  const closeOfficialDetails = useCallback(() => setSelectedOfficial(null), []);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2
            className={`text-sm font-semibold uppercase tracking-[0.35em] ${textClassNames.primaryBlue}`}
            style={{ color: isDark ? DARK_COLORS.primary : undefined }}
          >
            Barangay Leadership
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-7"
            style={{ color: isDark ? DARK_COLORS.paragraph : "#414753" }}
          >
            The dedicated officials of Barangay San Isidro serving the community
            with integrity and transparency.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(360px,460px)_1fr]">
          <div className="relative overflow-hidden lg:overflow-visible">
            <div className="absolute bottom-[-12px] left-0 top-[-20px] w-full rotate-0 rounded-[34px] bg-[rgba(252,212,0,0.1)] shadow-[0_30px_90px_rgba(252,212,0,0.12)] lg:left-[-30px] lg:w-[110%] lg:-rotate-5" />
            <div className="relative z-10 overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <button
                type="button"
                className="block w-full text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#004E9F]"
                aria-haspopup="dialog"
                aria-label={`View details for ${punongBarangay.name}, ${punongBarangay.position}`}
                onClick={() => setSelectedOfficial(punongBarangay)}
              >
                <img
                  src={chingImage}
                  alt={`${punongBarangay.name}, ${punongBarangay.position}`}
                  className="h-[440px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                  style={{
                    objectPosition: punongBarangay.objectPosition,
                    backgroundColor: isDark ? DARK_COLORS.surface : "#f3f4f6",
                  }}
                />
                <div
                  className={`${bgClassNames.primaryBlue} px-6 py-6 text-white`}
                  style={{
                    backgroundColor: isDark ? DARK_COLORS.surface : undefined,
                  }}
                >
                  <p className="text-xs font-normal uppercase tracking-[0.45em]">
                    {punongBarangay.position}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-6">
                    {punongBarangay.name}
                  </h3>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-[0.35em] ${textClassNames.primaryBlue}`}
                style={{ color: isDark ? DARK_COLORS.primary : undefined }}
              >
                Meet the Barangay Council
              </p>
              <p
                className="mt-5 text-lg leading-8"
                style={{ color: isDark ? DARK_COLORS.paragraph : "#414753" }}
              >
                Ang Kapitan na Madaling Lapitan, May Aksyon sa Bawat
                Pangangailangan.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-1 w-16 rounded-full bg-[#FCD400]" />
              <span
                className={`h-1 w-8 rounded-full ${bgClassNames.primaryBlue}`}
                style={{
                  backgroundColor: isDark ? DARK_COLORS.primary : undefined,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {officials.map((official) => (
            <OfficialCard
              key={official.name}
              image={official.image}
              position={official.position}
              name={official.name}
              objectPosition={official.objectPosition}
              onClick={() => setSelectedOfficial(official)}
            />
          ))}
        </div>
      </div>

      <OfficialDetailsModal
        official={selectedOfficial}
        onClose={closeOfficialDetails}
      />
    </section>
  );
}

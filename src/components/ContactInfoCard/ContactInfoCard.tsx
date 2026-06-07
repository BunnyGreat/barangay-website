import locationIcon from "../../assets/icons/location2.svg";
import contactIcon from "../../assets/icons/contact2.svg";
import clockIcon from "../../assets/icons/time.svg";

export default function ContactInfoCard() {
  return (
    <div className="rounded-2xl bg-[#004E9F] p-8 text-white shadow-lg">
      <h2 className="text-2xl font-semibold tracking-tight">
        Barangay Hall Information
      </h2>

      <div className="mt-8 space-y-8">
        {/* Office Address */}
        <div className="flex gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
            <img src={locationIcon} alt="Location icon" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Office Address
            </p>
            <p className="mt-2 text-sm leading-6 text-white">
              Sitio Tanag, San Isidro, Rodriguez, Rizal, 1860
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
            <img src={contactIcon} alt="Contact icon" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Phone Number
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              +63 (02) 8123–4567
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
            <img src={clockIcon} alt="Clock icon" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Operating Hours
            </p>
            <p className="mt-2 text-sm leading-6 text-white">
              Monday - Friday: 8:00 AM - 5:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="my-8 h-px bg-white/20" />

      {/* Emergency Note */}
      <p className="text-sm italic leading-6 text-white/70">
        For emergencies outside office hours, please dial our 24/7 hotline at
        911 or the local police station.
      </p>
    </div>
  );
}

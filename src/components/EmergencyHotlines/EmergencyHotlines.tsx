import logo from "../../assets/images/logo.png";
import arrowIcon from "../../assets/icons/arrow-right.svg";
import communityIcon from "../../assets/icons/community.svg";
import documentIcon from "../../assets/icons/document.svg";
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import warningIcon from "../../assets/icons/warning.svg";

type Hotline = {
  label: string;
  numbers: string[];
};

type HotlineColumnProps = {
  groups: Hotline[];
};

type Reminder = {
  text: string;
  icon: string;
};

const hotlineColumns: HotlineColumnProps[] = [
  {
    groups: [
      {
        label: "Main",
        numbers: ["0963-630-9765"],
      },
      {
        label: "Annex A1",
        numbers: ["0912-916-1000"],
      },
      {
        label: "Annex B",
        numbers: ["0963-861-6663"],
      },
      {
        label: "Annex E",
        numbers: ["0915-265-6764"],
      },
      {
        label: "Annex F",
        numbers: ["0996-940-3057"],
      },
    ],
  },
  {
    groups: [
      {
        label: "Control Base / MDRRMO",
        numbers: ["0915-001-6988", "0969-614-4825"],
      },
      {
        label: "Mun. Health Office",
        numbers: ["0906-695-8120"],
      },
      {
        label: "POEA - Rizal",
        numbers: ["0919-352-7936"],
      },
    ],
  },
  {
    groups: [
      {
        label: "PNP - Montalban",
        numbers: ["8-633-9263", "0999-195-5988", "0998-967-3464"],
      },
      {
        label: "Rodriguez Fire Station",
        numbers: ["8-504-3498", "0906-326-3209", "0951-604-7279"],
      },
    ],
  },
];

const leftReminders: Reminder[] = [
  {
    icon: notificationIcon,
    text: "Alamin ang balita ukol sa panahon at mga anunsyong pangkaligtasan.",
  },
  {
    icon: documentIcon,
    text: "Alamin ang plano ng komunidad sa pagbibigay-babala at paglikas dahil sa baha.",
  },
  {
    icon: communityIcon,
    text: "Makilahok sa pagsasanay at paghahanda ng komunidad sa baha.",
  },
  {
    icon: homeIcon,
    text: "Siguraduhing ligtas ang inyong tahanan. Iakyat ang mahahalagang kagamitan sa mas mataas na lugar.",
  },
];

const rightReminders: Reminder[] = [
  {
    icon: warningIcon,
    text: "Bago lumikas, isarado ang mga main switches ng kuryente, tubig at tangke ng LPG.",
  },
  {
    icon: communityIcon,
    text: "Ilikas ang mga alagang hayop sa ligtas na lugar.",
  },
  {
    icon: arrowIcon,
    text: "Kapag inabisuhan ng kinauukulan, mabilis na lumikas sa mataas at ligtas na lugar.",
  },
];

function HotlineNumber({ number }: { number: string }) {
  const telephoneNumber = number.replace(/[^\d+]/g, "");

  return (
    <a
      href={`tel:${telephoneNumber}`}
      className="font-[Impact,'Arial_Narrow',sans-serif] text-lg tracking-[0.12em] text-white decoration-white/50 underline-offset-4 hover:underline sm:text-xl"
    >
      {number}
    </a>
  );
}

function HotlineColumn({ groups }: HotlineColumnProps) {
  return (
    <div className="space-y-5 py-6 first:pt-0 last:pb-0 lg:px-6 lg:py-2 lg:first:pl-0 lg:last:pr-0">
      {groups.map((group) => (
        <div
          key={group.label}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"
        >
          <h3 className="font-[Impact,'Arial_Narrow',sans-serif] text-sm uppercase leading-6 tracking-[0.08em] text-white/90 sm:text-base">
            {group.label}
          </h3>
          <div className="flex flex-col items-end gap-1 text-right">
            {group.numbers.map((number) => (
              <HotlineNumber key={number} number={number} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReminderList({ reminders }: { reminders: Reminder[] }) {
  return (
    <ul className="space-y-5">
      {reminders.map((reminder) => (
        <li key={reminder.text} className="flex items-start gap-4">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10">
            <img
              src={reminder.icon}
              alt=""
              aria-hidden="true"
              className="h-7 w-7 brightness-0 invert"
            />
          </span>
          <p className="pt-1 text-sm leading-6 text-white/90 sm:text-base">
            {reminder.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function EmergencyHotlines() {
  return (
    <section
      aria-labelledby="emergency-hotlines-title"
      className="px-6 py-12 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#050505] text-white shadow-xl">
        <header className="bg-[linear-gradient(110deg,#780b12_0%,#111114_50%,#10147a_100%)] px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="h-14 w-14 rounded-full bg-white object-contain p-0.5 sm:h-16 sm:w-16"
            />
            <div className="border-l border-white/80 pl-4">
              <p className="text-lg font-bold uppercase tracking-wide sm:text-2xl">
                Barangay San Isidro
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm">
                Montalban, Rizal
              </p>
            </div>
          </div>

          <h2
            id="emergency-hotlines-title"
            className="mt-8 text-center font-[Impact,'Arial_Narrow',sans-serif] text-5xl uppercase leading-[0.95] tracking-[0.07em] sm:mt-10 sm:text-7xl lg:text-8xl"
          >
            Emergency
            <span className="block">Hotlines</span>
          </h2>

          <div className="mt-8 border-y border-white/90 py-5 text-center sm:mt-10 sm:py-6">
            <h3 className="font-[Impact,'Arial_Narrow',sans-serif] text-xl uppercase tracking-[0.1em] sm:text-3xl">
              Brgy. San Isidro Command Center
            </h3>
            <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 font-[Impact,'Arial_Narrow',sans-serif] text-2xl tracking-[0.12em] sm:text-4xl lg:text-5xl">
              <HotlineNumber number="0939-1524347" />
              <span aria-hidden="true">/</span>
              <HotlineNumber number="0916-4165853" />
            </div>
          </div>
        </header>

        <div className="divide-y divide-white/70 px-6 py-2 sm:px-10 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-12 lg:py-8">
          {hotlineColumns.map((column) => (
            <HotlineColumn
              key={column.groups.map(({ label }) => label).join("|")}
              groups={column.groups}
            />
          ))}
        </div>

        <div className="border-t border-white/80 px-6 py-7 sm:px-10 sm:py-9 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <ReminderList reminders={leftReminders} />
            <ReminderList reminders={rightReminders} />
          </div>
        </div>
        <div className="h-2 bg-[linear-gradient(90deg,#12b8e8_0%,#12b8e8_30%,#f5d31b_30%,#f5d31b_62%,#1445b4_62%,#1445b4_100%)]" />
      </div>
    </section>
  );
}

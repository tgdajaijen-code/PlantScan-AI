import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Bell, Droplets, Sun, Sparkles, Plus, Trash2, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PLANTS } from '../data/plantDatabase';

export const RemindersScreen: React.FC = () => {
  const { reminders, addReminder, deleteReminder, toggleReminder, goBack, t } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(SAMPLE_PLANTS[0].id);
  const [reminderType, setReminderType] = useState<'Watering' | 'Fertilizing' | 'Pruning' | 'Repotting' | 'Health Check'>('Watering');
  const [frequencyDays, setFrequencyDays] = useState(7);
  const [time, setTime] = useState('09:00');

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const plantObj = SAMPLE_PLANTS.find(p => p.id === selectedPlantId) || SAMPLE_PLANTS[0];
    addReminder({
      plantId: plantObj.id,
      plantName: plantObj.commonName,
      type: reminderType,
      frequencyDays: Number(frequencyDays),
      nextDueDate: new Date(Date.now() + 86400000 * Number(frequencyDays)).toISOString(),
      time,
      enabled: true
    });
    setIsAddOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Top Bar */}
      <div className="p-4 bg-white dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
              <Bell className="w-4 h-4 text-emerald-500" />
              <span>{t.reminders}</span>
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {reminders.filter(r => r.enabled).length} Active Botanical Notifications
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl flex items-center gap-1 text-xs font-bold shadow-md cursor-pointer transition"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Alarm</span>
        </button>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {reminders.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Droplets className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3 animate-bounce" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Care Reminders Scheduled</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
              Never forget to water or fertilize your house plants! Tap add to create a reminder.
            </p>
          </div>
        ) : (
          reminders.map((rem) => (
            <motion.div
              key={rem.id}
              layout
              className={`p-4 rounded-3xl border transition ${
                rem.enabled
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    rem.type === 'Watering'
                      ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                      : rem.type === 'Fertilizing'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                  }`}>
                    {rem.type === 'Watering' ? <Droplets className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white">
                      {rem.plantName}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{rem.type}</span>
                      <span>• Every {rem.frequencyDays} days at {rem.time}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rem.enabled}
                    onChange={() => toggleReminder(rem.id)}
                    className="w-5 h-5 accent-emerald-500 cursor-pointer rounded"
                  />
                  <button
                    onClick={() => deleteReminder(rem.id)}
                    className="p-2 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-xl transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal to Add New Reminder */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-emerald-500" />
                  <span>Set Botanical Reminder</span>
                </h3>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateReminder} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Plant Specimen
                  </label>
                  <select
                    value={selectedPlantId}
                    onChange={(e) => setSelectedPlantId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white"
                  >
                    {SAMPLE_PLANTS.map(p => (
                      <option key={p.id} value={p.id}>{p.commonName} ({p.scientificName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Care Action Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Watering', 'Fertilizing', 'Pruning', 'Repotting'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setReminderType(type)}
                        className={`p-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                          reminderType === type
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Repeat Frequency
                    </label>
                    <select
                      value={frequencyDays}
                      onChange={(e) => setFrequencyDays(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value={1}>Every Day</option>
                      <option value={3}>Every 3 Days</option>
                      <option value={7}>Every 7 Days</option>
                      <option value={14}>Every 14 Days</option>
                      <option value={30}>Monthly (30 Days)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Alarm Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer mt-2"
                >
                  Save Botanical Alarm
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

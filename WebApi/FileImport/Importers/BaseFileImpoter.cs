using System;
using System.Threading.Tasks;
using System.Threading;

namespace SignalRDemo
{
	public abstract class BaseFileImporter : IFileImporter
	{
		public void Execute(string[] files)
		{
			int duration = 5;
			Thread.Sleep(duration * 1000);
			Console.WriteLine("File Import Completed");
		}

		public Task ExecuteAsync(string[] files)
		{
			return Task.Run(() => Execute(files));
		}
	}
}